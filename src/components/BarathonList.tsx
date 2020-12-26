import React from "react";
import {IBarathon, IPub} from "../types/api";
import BarathonThumbnail from './BarathonThumbnail'

interface IProps {
    pubs: IPub[];
    barathons: IBarathon[];
}

const BarathonList = ({ barathons, pubs}: IProps): JSX.Element => {
    return (
        <>
            {barathons.map((barathon: IBarathon) => {
                return (
                    <BarathonThumbnail barathon={barathon} pubs={pubs} />
                );
            })}
        </>
    );
};

export default BarathonList;