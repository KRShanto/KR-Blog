import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import {
  UserCircle,
  BookMarked,
  Settings,
  ThumbsUp,
  MessageSquare,
  Bell,
} from "lucide-react";
import NavLink from "./NavLink";
export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const NavItems = [
    { id: "/profile", label: "Profile", icon: <UserCircle /> },
    { id: "/profile/saved", label: "Saved Posts", icon: <BookMarked /> },
    { id: "/profile/liked", label: "Liked Posts", icon: <ThumbsUp /> },
    { id: "/profile/comments", label: "Your Comments", icon: <MessageSquare /> },
    { id: "/profile/notifications", label: "Notifications", icon: <Bell /> },
    { id: "/profile/settings", label: "Settings", icon: <Settings /> },
  ];
  return (
    <div className="flex h-screen">
      {/* Sidebar for larger screens */}
      <aside className="hidden w-64 flex-col border-r p-4 sm:flex">
        <ScrollArea className="flex-grow">
          <nav className="space-y-2">
            {NavItems.map((item) => (
              <NavLink key={item.id} item={item} />
            ))}
          </nav>
        </ScrollArea>
      </aside>

      {/* Mobile menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="fixed left-4 top-4 z-50 sm:hidden">
            <Menu className="h-6 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 sm:hidden">
          <nav className="mt-8 space-y-2">
            {NavItems.map((item) => (
              <NavLink key={item.id} item={item} isMobile />
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <main className="flex-grow overflow-auto p-6">{children}</main>
    </div>
  );
}
