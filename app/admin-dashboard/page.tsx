import BreadCrumbs from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { SearchParams } from "next/dist/server/request/search-params";
import Link from "next/link";
import PropertiesTable from "./_components/properties-table";

const AdminDashboardPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const { page }: { page?: string } = await searchParams;
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
      <PropertiesTable page={page ? parseInt(page) : 1} />
    </div>
  );
};

export default AdminDashboardPage;
