import { Form, Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Actions } from '../../../redux/profile/actions';
import {
	getIsProfileLoading,
	getProfileData,
	getProfileStateErrors,
} from '../../../redux/profile/selectors';
import { Profile } from '../../../shared/interfaces/profile.interface';

import ButtonComponent from '../buttons/ButtonComponent/ButtonComponent';
import {
	ButtonColorsEnum,
	ButtonTypesEnum,
} from '../buttons/buttonComponentEnum';
import ErrorText from '../ErrorText/ErrorText';
import FormikField from '../FormikField/FormikField';
import FormSubmit from '../TitleContainer/TitleContainer';

import { fieldsForEditData } from './formFields';
import { UpdateProfileDataSchema } from './formFields';
import styles from './ModalWindowEditData.module.scss';

const ModalWindowEditData: React.FC = () => {
	const dispatch = useDispatch();

	const profileData: Profile = useSelector(getProfileData);
	const isLoading = useSelector(getIsProfileLoading);
	const errorsState: any = useSelector(getProfileStateErrors);

	const handlerSubmit = (data: Profile) => {
		dispatch(Actions.updateProfile(data));
	};

	const handlerClose = () => {
		dispatch(Actions.setModal(false));
	};

	const errors =
		errorsState &&
		errorsState.map((item: any, index: number) => {
			return <li key={index}>{item}</li>;
		});

	return (
		<div className={styles.modalWindow}>
			<div className={styles.modalWindowContainer}>
				<FormSubmit title='Edit data'>
					<Formik
						initialValues={profileData}
						validationSchema={UpdateProfileDataSchema}
						s={true}
						onSubmit={handlerSubmit}
					>
						{({ dirty, isValid, isSubmitting }) => {
							return (
								<Form>
									{fieldsForEditData.map(({ id, ...props }) => {
										return <FormikField key={id} id={id} {...props} />;
									})}

									<ErrorText>{errors}</ErrorText>

									<div className={styles.wrapperButtons}>
										<ButtonComponent
											color={ButtonColorsEnum.primary}
											text={isLoading ? 'Loading...' : 'Done'}
											disabled={!dirty || !isValid || (isSubmitting && !errors)}
											type={ButtonTypesEnum.submit}
										/>

										<ButtonComponent
											onClick={handlerClose}
											color={ButtonColorsEnum.secondary}
											text='Close'
										/>
									</div>
								</Form>
							);
						}}
					</Formik>
				</FormSubmit>
			</div>
		</div>
	);
};

export default ModalWindowEditData;
