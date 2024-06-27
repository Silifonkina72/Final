import {} from './Basket.css';

const Success = () => {
  return (
    <div className='messageBasket'>
      <p>Благодарим за заказ!</p>
      <br></br>
      <p>Мы пришлем вам письмо,
        <br></br>когда он будет собран</p>
      <br></br>
      <svg
        width='100px'
        height='100px'
        viewBox='0 0 48 48'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g id='Layer_2' data-name='Layer 2'>
          <g id='invisible_box' data-name='invisible box'>
            <rect width='48' height='48' fill='none' />
          </g>
          <g id='Layer_7' data-name='Layer 7'>
            <g>
              <path d='M37.7,11.1A3,3,0,0,0,35.4,10H34.2l.3-1.7A3.1,3.1,0,0,0,33.9,6a3.2,3.2,0,0,0-2.2-1H7.9A2.1,2.1,0,0,0,5.8,6.7,2,2,0,0,0,7.8,9h7.3A3,3,0,0,1,18,12.5L15.6,26.3a3,3,0,0,1-2.9,2.5H4.8a2,2,0,0,0-2,1.6L2,34.7A2.8,2.8,0,0,0,2.7,37a2.8,2.8,0,0,0,2.1,1H7.3a7,7,0,0,0,13.4,0h4.6a7,7,0,0,0,13.4,0h2a3.2,3.2,0,0,0,3.1-2.7L46,22.5ZM14,39a3,3,0,0,1-3-3,3,3,0,0,1,6,0A3,3,0,0,1,14,39Zm18,0a3,3,0,0,1-3-3,3,3,0,0,1,6,0A3,3,0,0,1,32,39Zm.1-17,1.4-8h1.3l5.9,8Z' />
              <path d='M4,15H14a2,2,0,0,0,0-4H4a2,2,0,0,0,0,4Z' />
              <path d='M15,19a2,2,0,0,0-2-2H5a2,2,0,0,0,0,4h8A2,2,0,0,0,15,19Z' />
              <path d='M6,23a2,2,0,0,0,0,4h6a2,2,0,0,0,0-4Z' />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Success;
