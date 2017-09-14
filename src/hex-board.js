import React from "react";
import PropTypes from 'prop-types';
import Hex, {gridPoints} from "react-hex";

class HexBoard extends React.Component {
    render() {
        const type = this.props.type;
        const size = this.props.size;
        const oX = this.props.oX;
        const oY = this.props.oY;
        const width = this.props.width;
        const height = this.props.height;
        const onClick = this.props.onClick;
        const board = this;

        const points = gridPoints(type, oX, oY, size, width, height);

        const hexes = points.map((point, i) => {
            const {props} = point;
            const key = i;
            const owner = board.props.hexes[key];
            const fill = owner === undefined
                ? "white"
                : owner;
            return (<Hex key={key} {...props} fill={fill} stroke="grey" onClick={() => onClick(key)}/>);
        });

        //TODO calculate width/height properties from size, type and width/height
        const svgWidth = "280";
        const svgHeight = "180";

        //return the gameboard containing hexes
        return (
            <svg id="game-board" viewBox={"0 0 " + svgWidth + " " + svgHeight}>
                {hexes}
            </svg>
        );
    }
}

HexBoard.propTypes = {
    type: PropTypes.oneOf(['pointy-topped']).isRequired,
    size: PropTypes.number.isRequired,
    oX: PropTypes.number.isRequired,
    oY: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

HexBoard.defaultProps = {
    type: 'pointy-topped',
    size: 10,
    oX: 100,
    oY: 100,
    width: 25,
    height: 25,
    onClick: (i => { console.log("No onClick defined, click unhandled"); }),
};

export default HexBoard;
