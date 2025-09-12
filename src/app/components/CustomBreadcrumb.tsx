"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface Crumb {
  label: string;
  href?: string;
}

export default function CustomBreadcrumb({ items }: { items: Crumb[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="flex items-center gap-1 text-sm">
        {items.map((item, idx) => (
          <BreadcrumbItem key={item.label} className="flex items-center">
            {item.href ? (
              <BreadcrumbLink asChild>
                <Link
                  href={item.href}
                  className="text-gray-600 hover:text-[#C46C2B] font-medium transition-colors"
                >
                  {item.label}
                </Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage className="text-[#C46C2B] font-semibold">
                {item.label}
              </BreadcrumbPage>
            )}

            {idx < items.length - 1 && (
              <BreadcrumbSeparator>
                <ChevronRight size={16} className="mx-1 text-gray-400" />
              </BreadcrumbSeparator>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
