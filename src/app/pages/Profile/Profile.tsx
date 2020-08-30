import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Actions } from '../../../redux/profile/actions';
import {
	getIsProfileLoading,
	getProfileData,
	getProfileStateModal,
} from '../../../redux/profile/selectors';

import ButtonComponent from '../../components/buttons/ButtonComponent/ButtonComponent';
import { ButtonColorsEnum } from '../../components/buttons/buttonComponentEnum';
import CommonContainer from '../../components/CommonContainer/CommonContainer';
import Header from '../../components/Header/Header';
import ModalWindowEditData from '../../components/ModalWindowEditData/ModalWindowEditData';

import styles from './Profile.module.scss';

const Profile: React.FC = () => {
	const dispatch = useDispatch();

	const profileData = useSelector(getProfileData);
	const isLoading = useSelector(getIsProfileLoading);
	const stateModal = useSelector(getProfileStateModal);

	const [modalWindowEditData, setModalWindowEditData] = useState<boolean>(
		stateModal
	);

	useEffect(() => {
		setModalWindowEditData(stateModal);
	}, [stateModal]);

	const userId = localStorage.getItem('id');

	useEffect(() => {
		dispatch(Actions.profileRequest(userId));
	},[]);

	const handleAddProfileData = () => {
		dispatch(Actions.setModal(true));
	};

	return (
		<>
			<Header />
			<CommonContainer>
				<div className={styles.container}>
					<h1>Profile</h1>
					<div>
						{profileData && (
							<div>
								<div className={styles.rowTitle}>
									Full name:{' '}
									<span>{isLoading ? 'Loading...' : profileData.fullName}</span>
								</div>
								<div className={styles.rowTitle}>
									Email:{' '}
									<span>{isLoading ? 'Loading...' : profileData.email}</span>
								</div>
								<div className={styles.rowTitle}>
									Phone:{' '}
									<span>{isLoading ? 'Loading...' : profileData.phone}</span>
								</div>
								<div className={styles.rowTitle}>
									Country code:{' '}
									<span>
										{isLoading ? 'Loading...' : profileData.countryCode}
									</span>
								</div>
								<div className={styles.rowTitle}>
									Notifications:
									<span>
										{isLoading
											? 'Loading...'
											: profileData.notifications.toString()}
									</span>
								</div>
							</div>
						)}
					</div>

					<ButtonComponent
						center={true}
						onClick={handleAddProfileData}
						color={ButtonColorsEnum.primary}
						text='Edit'
						disabled={false}
					/>

					{modalWindowEditData && <ModalWindowEditData />}
				</div>
			</CommonContainer>
		</>
	);
};

export default Profile;
