import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Row, Col, Button } from 'antd';
import _ from 'lodash';
import { authService, cardService } from '../../services';
import { GameCard } from '../../components/game-card';
import { PageHeader } from '../../components/page-headers/page-headers';
import styles from './market.module.scss';

export default () => {
  const [user, setUser] = useState({});
  const userCards = user?.cards || [];
  const [cards, setCards] = useState([]);
  
  useEffect(() => {
    cardService.getAll().then(x => setCards(x));
    authService.getUser().then(x => setUser(x));
  }, []);
  

  const returnCard = (cardId) => {
    let userCard = userCards.find(c => c.card_id === cardId);
    userCard.count -= 1;
    let newCollection = userCard.count === 0
      ? _.reject(userCards, c => c.card_id == cardId)
      : [...userCards];
    newCollection = newCollection.map(({card_id, count}) => ({card_id, count}));
    cardService.updateUserCards(user.id, newCollection).then(x => setUser(x));
  };

  const buyCard = (cardId) => {
    let newCollection = _.reject(userCards, c => c.card_id == cardId)
      .map(({card_id, count}) => ({card_id, count}));
    let userCard = userCards.find(c => c.card_id === cardId);
    const count = userCard ? userCard.count + 1 : 1;
    newCollection.push({card_id: cardId, count});
    cardService.updateUserCards(user.id, newCollection).then(x => setUser(x));
  }

  return (
    <>
      <Head>
        <title>Game card market</title>
      </Head>
      
      <div className={styles.main}>
        <PageHeader ghost title="My cards"/>
        <Row gutter={25}>
          {userCards.map(userCard => {
            const card = cards.find(c => c.id === userCard.card_id);

            return card && (
              <Col xs={12} sm={8} xl={6} xxl={4} key={card.id}>
                <Button block onClick={() => returnCard(card.id)}>Return</Button>
                <GameCard {...card} count={userCard.count} />
              </Col>
            );
          })}
        </Row>

        <PageHeader ghost title="Card market"/>
        <Row gutter={25}>
          {cards.map(card => (
            <Col xs={12} sm={8} xl={6} xxl={4} key={card.id}>
              <Button type="primary" block onClick={() => buyCard(card.id)}>Buy</Button>
              <GameCard {...card} />
            </Col>
          ))}
        </Row>
      </div>
    </>
  )
}