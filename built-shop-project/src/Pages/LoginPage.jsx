import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slices/auth/authSlice';
import { useNavigate } from 'react-router-dom';
//DATA ACCESS
import { useLoginMutation } from '../redux/slices/auth/authApiSlice'; 
//COMPONENTS
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Neispravna e-mail adresa').required('E-mail je obavezan'),
      password: Yup.string().min(6, 'Šifra mora imati najmanje 6 karaktera').required('Šifra je obavezna'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const userData = await login(values).unwrap();
        dispatch(loginSuccess(userData)); 
        navigate('/all-products'); 
      } catch (error) {
        console.error('Greška pri prijavi', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return <LoginForm formik={formik} />;
};

export default LoginPage;
