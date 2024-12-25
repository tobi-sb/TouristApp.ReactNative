import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

interface SettingItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  showArrow?: boolean;
}

const SettingItem: React.FC<SettingItemProps> = ({ icon, title, subtitle, showArrow = true }) => (
  <TouchableOpacity style={styles.settingItem}>
    <View style={styles.settingIcon}>
      <Ionicons name={icon as any} size={24} color={colors.primary} />
    </View>
    <View style={styles.settingText}>
      <Text style={styles.settingTitle}>{title}</Text>
      {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
    </View>
    {showArrow && (
      <Ionicons name="chevron-forward" size={20} color={colors.gray} />
    )}
  </TouchableOpacity>
);

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>
      {children}
    </View>
  </View>
);

export const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* En-tête du profil */}
      <View style={styles.header}>
        <Image 
          source={require("../../assets/images/tobi.jpg")}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userEmail}>john.doe@example.com</Text>
      </View>

      {/* Section Compte */}
      <SettingsSection title="Compte">
        <SettingItem 
          icon="person-outline" 
          title="Informations personnelles"
          subtitle="Nom, email, téléphone"
        />
        <SettingItem 
          icon="card-outline" 
          title="Paiement"
          subtitle="Cartes enregistrées"
        />
        <SettingItem 
                  icon="location-outline"
                  title="Adresses enregistrées" subtitle={undefined}        />
      </SettingsSection>

      {/* Section Préférences */}
      <SettingsSection title="Préférences">
        <SettingItem 
          icon="notifications-outline" 
          title="Notifications"
          subtitle="Gérer les notifications"
        />
        <SettingItem 
          icon="globe-outline" 
          title="Langue"
          subtitle="Français"
        />
        <SettingItem 
          icon="moon-outline" 
          title="Thème"
          subtitle="Clair"
        />
      </SettingsSection>

      {/* Section Assistance */}
      <SettingsSection title="Assistance">
        <SettingItem 
                  icon="help-circle-outline"
                  title="Centre d'aide" subtitle={undefined}        />
        <SettingItem 
                  icon="chatbubble-outline"
                  title="Contacter le support" subtitle={undefined}        />
        <SettingItem 
                  icon="document-text-outline"
                  title="Conditions d'utilisation" subtitle={undefined}        />
      </SettingsSection>

      {/* Bouton de déconnexion */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBackground,
    paddingTop: 170,

  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    color: colors.text,
    marginBottom: 4,
  },
  userEmail: {
    ...typography.body,
    color: colors.gray,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: colors.gray,
    marginLeft: 16,
    marginBottom: 8,
  },
  sectionContent: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.lightText,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightText,
  },
  settingIcon: {
    width: 40,
    alignItems: 'center',
  },
  settingText: {
    flex: 1,
    marginLeft: 12,
  },
  settingTitle: {
    ...typography.body,
    color: colors.text,
  },
  settingSubtitle: {
    color: colors.gray,
    marginTop: 2,
  },
  logoutButton: {
    margin: 16,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  logoutText: {
    ...typography.body,
  },
});

export default ProfileScreen;