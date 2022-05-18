import React from "react";
import Poster from "./Poster";
import styled from "styled-components/native";
import Votes from "./Votes";

interface VCardProps {
  posterPath: string;
  title: string;
  votes?: number;
  releaseDate?: string;
  overview?: string;
}

const VCard: React.FC<VCardProps> = (props) => {
  const { posterPath, title, votes, releaseDate, overview } = props;
  return (
    <Styled.Container>
      <Poster path={posterPath} />
      <Styled.Title>
        {title.slice(0, 13)}
        {title.length > 13 && "..."}
      </Styled.Title>
      {votes && <Votes votes={votes} />}
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.View`
    align-items: center;
  `,
  Title: styled.Text`
    color: ${({ theme }) => theme.text};
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 5px;
  `,
};

export default VCard;
