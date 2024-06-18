import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Container
      maxWidth='sm'
      style={{ textAlign: 'center', marginTop: '100px' }}
    >
      <Typography variant='h1' gutterBottom>
        404
      </Typography>
      <Typography variant='h4' gutterBottom>
        Страница не найдена
      </Typography>
      <Typography variant='body1' gutterBottom>
        Запрашиваемая вами страница не существует или была удалена.
      </Typography>
      <Button
        variant='contained'
        component={Link}
        to='/'
        style={{ marginTop: '20px' }}
      >
        Вернуться на главную
      </Button>
    </Container>
  );
};

export default NotFoundPage;
