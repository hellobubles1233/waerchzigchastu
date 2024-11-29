import { ProfileForm } from '../components/Profile/ProfileForm';

export const Profile = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Mein Profil</h1>
      <ProfileForm />
    </div>
  );
};