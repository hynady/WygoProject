import React, { Component } from "react";
import styled, { css } from "styled-components";

function Untitled(props) {
    return (
        <Group2>
            <EllipseRow>
                <svg
                    viewBox="0 0 39.95 39.95"
                    style={{
                        width: 40,
                        height: 40
                    }}
                >
                    <ellipse
                        stroke="rgba(230, 230, 230,1)"
                        strokeWidth={0}
                        fill="rgba(230, 230, 230,1)"
                        cx={20}
                        cy={20}
                        rx={20}
                        ry={20}
                    ></ellipse>
                </svg>
                <Group>
                    <Rect>
                        <LoremIpsum>Lorem Ipsum</LoremIpsum>
                        <LoremIpsum4>Lorem Ipsum</LoremIpsum4>
                    </Rect>
                </Group>
            </EllipseRow>
        </Group2>
    );
}

const Group2 = styled.div`
    display: flex;
    width: 753px;
    height: 753px;
    shadow-radius: 0px;
    flex-direction: row;
    margin-top: -152px;
    margin-left: 124px;
    box-shadow: 3px 3px 0px  0.01px rgba(0,0,0,1) ;
`;

const Group = styled.div`
    width: 676px;
    height: 84px;
    flex-direction: column;
    display: flex;
    margin-left: 5px;
`;

const Rect = styled.div`
    width: 621px;
    height: 84px;
    background-color: #E6E6E6;
    border-radius: 20px;
    flex-direction: column;
    display: flex;
    box-shadow: 3px 3px 10px  0.1px rgba(0,0,0,1) ;
`;

const LoremIpsum = styled.span`
    font-family: System;
    font-style: normal;
    font-weight: 700;
    color: #121212;
    margin-top: 6px;
    margin-left: 16px;
`;

const LoremIpsum4 = styled.span`
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    color: #121212;
    margin-top: 10px;
    margin-left: 16px;
`;

const EllipseRow = styled.div`
    height: 84px;
    flex-direction: row;
    display: flex;
    flex: 1 1 0%;
    margin-right: 19px;
    margin-left: 13px;
    margin-top: 300px;
`;

export default Untitled;
