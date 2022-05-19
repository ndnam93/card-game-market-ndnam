
import { Cards } from './cards/frame/cards-frame';
import { CardWrapper } from './style';


export const GameCard = ({image_url, name, power, element, price, count}) => {
  return (
    <CardWrapper>
      <Cards headless>
        <img src={image_url} className="card-img"/>
        <h2>{name} <strong>{count && `x${count}`}</strong></h2>
        <p><b>Power: </b> {power}</p>
        <p><b>Element: </b> {element}</p>
        <p><b>Price: </b> {price} coin(s)</p>
      </Cards>
    </CardWrapper>
  );
};

