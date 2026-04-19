import app from './app';

const PORT = parseInt(process.env.API_PORT || '4000', 10);

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
