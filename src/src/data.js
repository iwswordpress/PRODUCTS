import React from 'react';

export const fetchUrl = () => {
  fetch(`https://49plus.co.uk/wp-social/wp-json/social/v2/products`)
    .then((response) => response.json())
    .then((data) => console.log(data));
};
