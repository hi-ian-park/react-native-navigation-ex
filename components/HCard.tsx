import React from 'react';
import Poster from './Poster';
import styled from 'styled-components/native';

interface HCardProps {
  posterPath: string;
  title: string;
  releaseDate?: string;
  votes?: number;
  overview: string;
}

const HCard: React.FC<HCardProps> = ({ posterPath, title, releaseDate, votes, overview }) => {
  return (
    <Styled.Container>
      <Poster path={posterPath} />
      <Styled.HorizontalColumn>
        <Styled.Title>{title}</Styled.Title>
        {releaseDate && (
          <Styled.Date>
            Coming: &nbsp;
            {new Date(releaseDate).toLocaleDateString('ko', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </Styled.Date>
        )}
        <Styled.OverView>
          {overview.length > 130 ? overview.slice(0, 130) : overview}
        </Styled.OverView>
      </Styled.HorizontalColumn>
    </Styled.Container>
  );
};

export default HCard;

const Styled = {
  Container: styled.View`
    flex-direction: row;
    padding-left: 20px;
  `,

  HorizontalColumn: styled.View`
    margin-left: 10px;
    width: 100%;
  `,

  Title: styled.Text`
    color: ${({ theme }) => theme.text};
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 5px;
  `,

  Date: styled.Text`
    font-size: 12px;
    color: ${({ theme }) => theme.text};
    margin-bottom: 5px;
  `,

  OverView: styled.Text`
    color: ${({ theme }) => theme.text};
    width: 60%;
  `,
};
