import axios from 'axios';

const LandingPage = ({ currentUser }) => {
  return currentUser ? <h1>You are signed in!</h1> : <h1>You are not signed in</h1>;
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
