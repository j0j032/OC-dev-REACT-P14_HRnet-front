export const parseImgUrl = (imgUrl) => {
	const commonImgUrlpart = 'https://p-14-hrnet-employees-and-users-pictures.s3.eu-west-3.amazonaws.com/'
	return imgUrl.replace(/\?.*/, '').split(commonImgUrlpart)[1]
}
