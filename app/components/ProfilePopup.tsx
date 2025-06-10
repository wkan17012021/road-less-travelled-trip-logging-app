import { Form, Link } from "@remix-run/react";
import { useRef, useState } from "react";
import { getInitials } from "~/utils/getInitials";
import Popup from "./Popup";

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
}

export default function ProfilePopup({ user }: { user: User }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative">
      <button
        className="flex items-center justify-center cursor-pointer"
        onClick={() => setIsPopupOpen(!isPopupOpen)}
        ref={popupButtonRef}
      >
        <img
          className="w-12 h-12 rounded-full ring-2 ring-cyan-300"
          src={user.avatar_url || "/user.jpg"}
          alt={user.name || "avatar"}
        />
      </button>
      {isPopupOpen && (
        <Popup
          isOpen={isPopupOpen}
          setIsOpen={setIsPopupOpen}
          buttonRef={popupButtonRef}
          className="right-0 p-4 mt-2 bg-white rounded-md shadow-sm top-full"
        >
          <div className="px-2 py-2 text-sm flex items-center gap-2">
            <img
              className="w-10 h-10 rounded-full ring-2 ring-cyan-300"
              src={user.avatar_url || "/user.jpg"}
              alt={user.name || "avatar"}
            />
          </div>
          <div className="py-2 px-2 space-y-1">
              <p className="font-semibold">{user.name}</p>
              <p className="text-xs">{user.email}</p>
            </div>
          <div className="py-2 space-y-1">
            <Link
              to="/dashboard/user"
              className="flex items-center px-2 py-2 text-sm transition rounded-md text-slate-700 hover:bg-slate-100"
            >
              Profile
            </Link>
            <Form action="/logout" method="POST">
              <button
                type="submit"
                className="w-full px-2 py-2 text-sm text-left transition rounded-md text-slate-700 hover:text-white hover:bg-cyan-500/90"
              >
                Logout
              </button>
            </Form>
          </div>
        </Popup>
      )}
    </div>
  );
}
