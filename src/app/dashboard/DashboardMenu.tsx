"use client";

import _ from "lodash";
import { MailOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useRouter } from "next/navigation";
import { Channels } from "@/app/dashboard/constants";

type MenuItem = Required<MenuProps>["items"][number];

const DashboardMenu = () => {
  const router = useRouter();
  const channels = _.values(Channels).map((channel) =>
    getItem(channel.name, channel.id)
  );
  const items: MenuItem[] = [
    getItem("Channels", "sub1", <MailOutlined />, channels),
  ];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  function onSelect({ key }: { key: string }) {
    router.push(`?channel=${key}&live=true`);
  }

  return (
    <Menu
      defaultSelectedKeys={["5"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      theme="dark"
      inlineCollapsed={false}
      items={items}
      onSelect={onSelect}
    />
  );
};

export { DashboardMenu };
