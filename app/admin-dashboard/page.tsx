import BreadCrumbs from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

const AdminDashboardPage = () => {
  return (
    <div>
      <BreadCrumbs
        items={[
          {
            label: "Dashboard",
          },
        ]}
      />
      <h1 className="text-4xl font-bold mt-6">Admin Dashboard</h1>
      <Button asChild className="inline-flex pl-2 gap-2 mt-4">
        <Link href="/admin-dashboard/new">
          <PlusCircleIcon /> New Property
        </Link>
      </Button>
    </div>
  );
};

export default AdminDashboardPage;
