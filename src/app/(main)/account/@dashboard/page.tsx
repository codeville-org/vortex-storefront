import { SignoutButton } from "@/modules/account/components/signout-button";
import React from "react";

export default function DashboardPage() {
  return (
    <div className="h-screen">
      <h2>Dashboard</h2>

      <SignoutButton />
    </div>
  );
}
