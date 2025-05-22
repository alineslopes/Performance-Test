import http from 'k6/http';
import { check } from 'k6';
import { getAuthToken } from '../utils/auth.js';
import { randomCrocodileData } from '../utils/dataGenerator.js';

export let options = {
  vus: 10,
  duration: '1m',
};

export default function () {
  const token = getAuthToken();
  const crocData = randomCrocodileData();

  // Criar o crocodilo
  const postRes = http.post(
    'https://test-api.k6.io/my/crocodiles/',
    JSON.stringify(crocData),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  check(postRes, {
    'post created': (r) => r.status === 201,
    'nome correto': (r) => r.json('name') === crocData.name,
  });

  // Se criado com sucesso, pegar o ID para deletar
  if (postRes.status === 201) {
    const crocId = postRes.json('id');

    // Deletar o crocodilo criado
    const deleteRes = http.del(
      `https://test-api.k6.io/my/crocodiles/${crocId}/`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    check(deleteRes, {
      'delete status 204': (r) => r.status === 204,
    });
  }
}