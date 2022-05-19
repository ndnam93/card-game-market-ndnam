import { fetchWrapper } from '../helpers';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;


function getAll() {
  return fetchWrapper.get(`${baseUrl}/cards`);
}

function updateUserCards(userId, cards) {
  return fetchWrapper.put(`${baseUrl}/users/${userId}/cards`, cards);
}

export const cardService = {
  getAll,
  updateUserCards,
};