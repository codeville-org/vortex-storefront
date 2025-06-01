import React from "react";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";

export function SocialLogins() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button variant="outline" type="button" className="w-full">
        <FaFacebook className="w-5 h-5 mr-2" />
        <span className="sr-only">Login with Facebook</span>
      </Button>
      <Button variant="outline" type="button" className="w-full">
        <FcGoogle className="w-5 h-5 mr-2" />
        <span className="sr-only">Login with Google</span>
      </Button>
    </div>
  );
}
