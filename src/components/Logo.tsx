import React, { useState } from "react";
import { Icon, Typography, Row } from "antd";
import { Motion, spring } from "react-motion";

const Logo: React.SFC = () => {
  const [hover, setHover] = useState(false);
  return (
    <Motion
      defaultStyle={{
        right: 40
      }}
      style={{ right: spring(hover ? 36 : -160) }}
    >
      {interpolatingStyle => (
        <a
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() =>
            window.open("https://devpost.com/software/pageport", "_blank")
          }
          style={{
            position: "absolute",
            zIndex: 1000,
            top: 36,
            ...interpolatingStyle
          }}
        >
          <Row type="flex">
            <Typography.Title style={{ color: "#1890ff" }}>
              <Icon type="like" style={{ marginRight: 16 }} />
              Pageport
            </Typography.Title>
          </Row>
        </a>
      )}
    </Motion>
  );
};

export default Logo;
