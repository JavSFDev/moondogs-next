import React from 'react';
import { HeadLine } from '../../components/component';
import HotNftCarousel from '../../components/carousel/Hot_Nft_Carousel';

const More_items = () => {
	return (
		<section className="py-24 dark:bg-jacarta-800 bg-light-base">
			{/* <!-- Hot Bids --> */}
			<div className="container">
				<HeadLine
					text="More from this collection"
					classes="font-display text-jacarta-700 mb-8 text-center text-3xl dark:text-white"
				/>

				<div className="relative">
					{/* <!-- Slider --> */}
					<HotNftCarousel />
				</div>
			</div>
			{/* <!-- end hot bids --> */}
		</section>
	);
};

export default More_items;
