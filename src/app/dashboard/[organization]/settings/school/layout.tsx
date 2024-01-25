
import SettingsContentContainer from '../components/SettingsContentContainer';
import { withI18n } from '~/i18n/with-i18n';
import SchoolSettingsTabs from './components/SchoolSettingsTabs';

function ProfileSettingsLayout({
  children,
  params,
}: React.PropsWithChildren<{
  params: {
    organization: string;
  };
}>) {
  return (
    <>
      <div>
        <SchoolSettingsTabs organizationId={params.organization} />
      </div>

      <SettingsContentContainer>{children}</SettingsContentContainer>
    </>
  );
}

export default withI18n(ProfileSettingsLayout);
