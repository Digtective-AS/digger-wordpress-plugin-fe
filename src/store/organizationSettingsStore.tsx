import { create } from 'zustand';
import { OrganizationSettingsInterface } from '../interfaces/organizationSettings.interface';

interface OrganizationSettingsState {
  organizationSettings: OrganizationSettingsInterface,
  setOrganizationSettings: (_newOrganizationSettings: OrganizationSettingsInterface) => void,
}
export const useOrganizationSettingsStore = create<OrganizationSettingsState>((set) => ({
  organizationSettings: {},
  setOrganizationSettings: (newOrganizationSettings) => set(() => ({
    organizationSettings: newOrganizationSettings,
  })),
}));
