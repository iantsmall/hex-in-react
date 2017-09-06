import React from "react";
import Hex, {gridPoints} from "react-hex";

class HexBoard extends React.Component {
    getType() {
        let {type} = this.props;
        return type === undefined
            ? "pointy-topped"
            : type;
    }

    getSize() {
        let {size} = this.props;
        return size === undefined
            ? 10
            : size;
    }

    getOffsetX() {
        let {oX} = this.props;
        return oX === undefined
            ? 100
            : oX;
    }

    getOffsetY() {
        let {oY} = this.props;
        return oY === undefined
            ? 100
            : oY;
    }

    getWidth() {
        let {width} = this.props;
        return width === undefined
            ? 25
            : width;
    }

    getHeight() {
        let {height} = this.props;
        return height === undefined
            ? 25
            : height;
    }

    getOnClick() {
        let {onClick} = this.props;
        return onClick === undefined
            ? i => {
                console.log("No onClick defined, click unhandled");
            }
            : onClick;
    }

    render() {
        const type = this.getType();
        const size = this.getSize();
        const oX = this.getOffsetX();
        const oY = this.getOffsetY();
        const width = this.getWidth();
        const height = this.getHeight();
        const board = this;
        const onClick = this.getOnClick();

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

        //return the gameboard containing hexes
        return (
            <svg width="100%" height="100%">
                {hexes}
            </svg>
        );
    }
}

export default HexBoard;
