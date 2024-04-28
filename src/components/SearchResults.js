import { Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function SearchResults(props) {
  const { results } = props;

  const redirectToGoogleMaps = (companyName) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(companyName)}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <Box mt={4} display="flex" justifyContent="center">
      <Grid container spacing={3} justifyContent="center">
        {results.length > 0 ? (
          <>
            {results.map((result, index) => (
              <Grid item key={result.id} xs={12} sm={6} md={3.5}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" fontWeight="bold">{result.title}</Typography>
                      <Typography variant="body2" color="primary">
                        <a href={result.link} style={{ textDecoration: 'none' }} target="_blank">{result.link}</a>
                      </Typography>
                    </Box>
                    <Typography variant="body2" mb={1} color="textSecondary">{result.description}</Typography>
                    <Typography variant="body2" color="primary"><b>R$ {result.price}</b></Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                      <a href={result.link} target="_blank">
                        <CardMedia
                          component="img"
                          image={result.image}
                          alt={result.title}
                          sx={{ width: 150, height: 150 }}
                        />
                      </a>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <LocationOnIcon sx={{ color: 'primary', fontSize: 20, mr: 1, cursor: 'pointer' }} onClick={() => redirectToGoogleMaps(result.company_selling)} />
                      <Typography variant="body2" color="textSecondary" sx={{ cursor: 'pointer' }} onClick={() => redirectToGoogleMaps(result.company_selling)}>{result.company_selling}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </>
        ) : (
          <Typography variant="h6" gutterBottom>
            Nenhum resultado encontrado
          </Typography>
        )}
      </Grid>
    </Box>
  );
}

export default SearchResults;
