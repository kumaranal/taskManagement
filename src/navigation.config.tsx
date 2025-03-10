import {
  CreditCardIcon,
  Squares2X2Icon,
  UserGroupIcon,
  UserIcon,
  AcademicCapIcon,
  RectangleStackIcon
} from '@heroicons/react/24/outline';

import configuration from '~/configuration';

type Divider = {
  divider: true;
};

type NavigationItemLink = {
  label: string;
  path: string;
  Icon: (props: { className: string }) => JSX.Element;
  end?: boolean;
};

type NavigationGroup = {
  label: string;
  collapsible?: boolean;
  collapsed?: boolean;
  children: NavigationItemLink[];
};

type NavigationItem = NavigationItemLink | NavigationGroup | Divider;

type NavigationConfig = {
  items: NavigationItem[];
};

const paths = configuration.paths.settings;

const NAVIGATION_CONFIG = (organization: string): NavigationConfig => ({
  items: [
    {
      label: 'common:dashboardTabLabel',
      path: getPath(organization, ''),
      Icon: ({ className }: { className: string }) => {
        return <Squares2X2Icon className={className} />;
      },
      end: true,
    },
    {
      label: 'common:contactTabLabel',
      path: getPath(organization, 'contact'),
      Icon: ({ className }: { className: string }) => {
        return <UserGroupIcon className={className} />;
      }
    },
    {
      label: 'common:DealsTabLabel',
      path: getPath(organization, 'deals'),
      Icon: ({ className }: { className: string }) => {
        return <CreditCardIcon className={className} />;
      }
    },
    {
      label: 'common:activitiesTabLabel',
      path: getPath(organization, 'activities'),
      Icon: ({ className }: { className: string }) => {
        return <UserGroupIcon className={className} />;
      }
    },
    {
      label: 'common:settingsTabLabel',
      collapsible: false,
      children: [
        {
          label: 'common:profileSettingsTabLabel',
          path: getPath(organization, paths.profile),
          Icon: ({ className }: { className: string }) => {
            return <UserIcon className={className} />;
          },
        },
        {
          label: 'common:organizationSettingsTabLabel',
          path: getPath(organization, paths.organization),
          Icon: ({ className }: { className: string }) => {
            return <UserGroupIcon className={className} />;
          },
        },
        {
          label: 'common:subscriptionSettingsTabLabel',
          path: getPath(organization, paths.subscription),
          Icon: ({ className }: { className: string }) => {
            return <CreditCardIcon className={className} />;
          },
        },
        {
          label: 'School',
          path: getPath(organization, paths.school),
          Icon: ({ className }: { className: string }) => {
            return <AcademicCapIcon className={className} />;
          },
        },
      ],
    },
  ],
});

export default NAVIGATION_CONFIG;

function getPath(organizationId: string, path: string) {
  const appPrefix = configuration.paths.appPrefix;

  return [appPrefix, organizationId, path].filter(Boolean).join('/');
}
