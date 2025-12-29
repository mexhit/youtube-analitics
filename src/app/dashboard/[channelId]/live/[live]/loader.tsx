import { Spin } from "antd";

const Loader = () => {
  return (
    <div className="flex justify-center">
      <Spin size="large" />
    </div>
  );
};

export { Loader };
