import React from "react";
import styled from "styled-components/native";

interface HListProps {
  title: string;
}

const HCardList: React.FC<HListProps> = ({ title, children }) => {
  return (
    <>
      <Styled.ListTitle>{title}</Styled.ListTitle>
      {children}
    </>
  );
};

export default HCardList;

const Styled = {
  ListTitle: styled.Text`
    color: ${({ theme }) => theme.text};
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
    padding: 0 20px;
  `,
};
