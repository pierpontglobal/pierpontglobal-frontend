import React from 'react';
import Container from '../styles/Container/Container';

function pickHex(color1, color2, color3, weight) {
  if (weight == null) {
    return [169, 169, 169];
  } if (weight === 2.5) {
    return color2;
  } if (weight < 2.5) {
    const w1 = weight / 2.5;
    const w2 = 1 - w1;
    const rgb = [Math.round(color2[0] * w1 + color3[0] * w2),
      Math.round(color2[1] * w1 + color3[1] * w2),
      Math.round(color2[2] * w1 + color3[2] * w2)];
    return rgb;
  }
  const w1 = (weight - 2.5) / 2.5;
  const w2 = 1 - w1;
  const rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
    Math.round(color1[1] * w1 + color2[1] * w2),
    Math.round(color1[2] * w1 + color2[2] * w2)];
  return rgb;
}

function ConditionBtn({ score, className }) {
  return (
    <Container
      className={`d-flex justify-content-between border-0 ${className || ''}`}
      maxHeight="24px"
      borderRadius="4px"
      fontSize="0.8125em"
      lineHeight={1.31}
      backgroundColor="#eeeeee"
    >
      <p className="flex-fill mb-0 align-self-center text-center">Condition</p>
      <Container
        className="d-flex flex-fill py-2 border-0"
        maxWidth="24px"
        borderRadius="4px"
        backgroundColor={`rgb(${pickHex([24, 183, 11], [255, 167, 0], [255, 0, 0], score).join()})`}
        fontSize="0.75em"
        fontWeight="bold"
        lineHeight={1.33}
        fontColor="#ffffff"
      >
        <p className=" flex-fill mb-0 align-self-center text-center">{score !== null ? score : '-' }</p>
      </Container>
    </Container>
  );
}

export default ConditionBtn;
