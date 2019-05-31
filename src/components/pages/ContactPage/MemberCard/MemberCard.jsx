import React from 'react';
import styled from 'styled-components';

const TeamMemberCard = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CardHeader = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const HeaderPhoto = styled.img`
  border-radius: 50%;
  width: 42px;
  height: 42px;
`;

const CarBody = styled.div`
  width: 100%;
  height: auto;
  padding: 16px;
`;

const Name = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 8px;
  & > span {
    font-weight: 400;
    font-size: 1.15rem;
  }
`;

const PhoneNumber = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 8px;
  & > span {
    font-weight: 200;
    font-size: 1.05rem;
  }
`;

const Email = styled.div`
  width: 100%;
  text-align: center;
  & > span {
    font-weight: 200;
    font-size: 0.95rem;
  }
`;

const MemberCard = (props) => {
  return (
    <TeamMemberCard>
      <CardHeader>
        <HeaderPhoto alt="" src="/images/no-user-photo.png" />
      </CardHeader>
      <CarBody>
        <Name>
          <span>
            Jhon Doe
          </span>
        </Name>
        <PhoneNumber>
          <span>
            (829) - 999-9999
          </span>
        </PhoneNumber>
        <Email>
          <span>
            sample@pierpontglobal.com
          </span>
        </Email>
      </CarBody>
    </TeamMemberCard>
  );
}

export default MemberCard;
