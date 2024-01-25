'use client';

import React, { useMemo } from 'react';

import NavigationItem from '~/core/ui/Navigation/NavigationItem';
import NavigationMenu from '~/core/ui/Navigation/NavigationMenu';
import MobileNavigationDropdown from '~/core/ui/MobileNavigationDropdown';

import useUser from '~/core/hooks/use-user';
import configuration from '~/configuration';

const profileTabLinks = (organizationId: string) => ({
  General: {
    path: getPath(organizationId, `school/school-details`),
    label: 'School Details',
  },
  Authentication: {
    path: getPath(organizationId, `school/student-details`),
    label: 'Student Details',
  },
  Email: {
    path: getPath(organizationId, `school/teachers-details`),
    label: 'Teachers Details',
  },
});

const itemClassName = `flex justify-center lg:justify-start items-center w-full`;

const SchoolSettingsTabs: React.FC<{
  organizationId: string;
}> = ({ organizationId }) => {
  const canUpdatePasswordCredentials = useCanUpdatePassword();

  const links = useMemo(
    () => profileTabLinks(organizationId),
    [organizationId],
  );

  return (
    <>
      <div className={'hidden min-w-[12rem] lg:flex'}>
        <NavigationMenu vertical pill>
          <NavigationItem
            depth={0}
            className={itemClassName}
            link={links.General}
          />

          <NavigationItem
            className={itemClassName}
            link={links.Authentication}
          />

          <NavigationItem
            className={itemClassName}
            disabled={!canUpdatePasswordCredentials}
            link={links.Email}
          />
        </NavigationMenu>
      </div>

      <div className={'block w-full lg:hidden'}>
        <MobileNavigationDropdown links={Object.values(links)} />
      </div>
    </>
  );
};

export default SchoolSettingsTabs;

function getPath(organizationId: string, path: string) {
  const appPrefix = configuration.paths.appPrefix;
  return `${appPrefix}/${organizationId}/settings/${path}`;
}

function useCanUpdatePassword() {
  const { data: user } = useUser();

  // user can only edit email and password
  // if they signed up with the EmailAuthProvider provider
  return useMemo(() => {
    if (!user) {
      return false;
    }

    const emailProviderId = 'email';
    const identities = user.identities ?? [];

    return identities.some((identity) => {
      return identity.provider === emailProviderId;
    });
  }, [user]);
}
