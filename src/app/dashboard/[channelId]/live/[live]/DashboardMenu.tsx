"use client";

import _ from "lodash";
import { MailOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useRouter } from "next/navigation";
import { Channels } from "@/app/dashboard/[channelId]/live/[live]/constants";
import "./dashboard-menu.css";

type MenuItem = Required<MenuProps>["items"][number];

const DashboardMenu = () => {
  const router = useRouter();

  const channels = _.values(Channels).map((channel) =>
    getItem(channel.name, channel.id),
  );

  const items: MenuItem[] = [
    getItem("Channels", "sub1", <MailOutlined />, channels),
  ];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group",
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
    router.push(`/dashboard/${key}/live/true`);
  }

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-header">Dashboard</div>

      <Menu
        mode="inline"
        items={items}
        defaultOpenKeys={["sub1"]}
        theme="dark"
        className="dashboard-menu"
        onSelect={onSelect}
      />
    </aside>
  );
};

export { DashboardMenu };
