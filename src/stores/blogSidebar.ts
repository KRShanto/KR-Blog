import { create } from "zustand";

type BlogSidebarState = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

export const useBlogSidebarStore = create<BlogSidebarState>((set) => ({
  isOpen: false,
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
}));
