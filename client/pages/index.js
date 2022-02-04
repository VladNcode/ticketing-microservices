import axios from 'axios';

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>Landing Page</h1>;
};

export async function getServerSideProps({ req }) {
  const response = await axios.get(
    'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
    {
      headers: req.headers,
    }
  );

  return {
    props: {
      currentUser: response.data.currentUser,
    },
  };
}

export default LandingPage;
