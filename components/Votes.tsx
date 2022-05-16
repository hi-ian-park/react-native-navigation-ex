import React from "react";
import styled from "styled-components/native";

interface VotesProps {
  votes: number;
}

const Votes: React.FC<VotesProps> = ({ votes }) => {
  return (
    <Styled.Votes>
      {votes > 0 ? `⭐️ ${votes} / 10` : `Coming soon`}
    </Styled.Votes>
  );
};

export default Votes;

const Styled = {
  Votes: styled.Text`
    font-size: 12px;
    color: ${({ theme }) => theme.text};
  `,
};
