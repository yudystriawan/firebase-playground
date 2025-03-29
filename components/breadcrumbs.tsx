import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "./ui/breadcrumb";

const BreadCrumbs = ({
  items,
}: {
  items: {
    href?: string;
    label: string;
  }[];
}) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <BreadcrumbItem key={index}>
            {!!item.href && <Link href={item.href}>{item.label}</Link>}
            {!item.href && <BreadcrumbPage>{item.label}</BreadcrumbPage>}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbs;
