import styled from 'styled-components';
import { fontProps, containerProps } from '../Properties/Properties';

const InfoBar = styled.div`
    ${fontProps}
    ${containerProps}
    {
        height: 76px;
        background: #3e78c0;
        width: 100%;
        margin-top: -13px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export default InfoBar;
