import React from "react";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";

interface PosterProps {
  path: string;
}

const Poster: React.FC<PosterProps> = ({ path }) => {
  return <Styled.Poster source={{ uri: makeImgPath(path) }} />;
};

export default Poster;

const Styled = {
  Poster: styled.Image`
    width: 100px;
    height: 160px;
    border-radius: 6px;
    background-color: ${({ theme }) => theme.background};
  `,
};
