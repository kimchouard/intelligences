$(function(){
	$.get('IM.csv',function(data) { createCards($.csv.toObjects(data)); });
	
	var $cardsContainer = $('.cards-stack'),
		$controlsContainer = $('.controls'),
		$buttons = $controlsContainer.find('a'),
		$likeBtn = $controlsContainer.find('.like'),
		$dislikeBtn = $controlsContainer.find('.dislike'),
		$results = {
				L: 0,
				LM: 0,
				S: 0,
				M: 0,
				K: 0,
				INTER: 0,
				INTRA: 0,
				N: 0
		},
		$fullNames = {
				L: 'Linguistique',
				LM: 'Logico-Mathématique',
				S: 'Spatiale',
				M: 'Musicale',
				K: 'Kinesthésique',
				INTER: 'Interpersonnelle',
				INTRA: 'Intrapersonnelle',
				N: 'Naturaliste'
		},
		$currentActiveCard,
		$newActiveCard;
	
	
	// Get current active card
	function getActiveCard() {
		$currentActiveCard = $cardsContainer.find('.card').eq(0);
		$newActiveCard = $cardsContainer.find('.card').eq(1);
	}
	
	// Similar Button Functions
	function similarButtonFunctions() {
		$currentActiveCard.prependTo($cardsContainer);
		
		if($cardsContainer.find('.upcoming .card').size() <= 0) {
			$controlsContainer.hide();

			console.log('Terminé!', $results);

			var resultsKeys = Object.keys($results);
			resultsKeys.sort(function(aKey, bKey) {
				let a = $results[aKey];
				let b = $results[bKey];
				console.log(aKey,a,bKey,b);
				return b - a;
			});
			resultsKeys.map(function(intelligence, index) {
					var result = $results[intelligence];
					$('#results').append(`<li>${$fullNames[intelligence]}: ${result}</li>`);
			});
		}
	}
	
	// Click Like
	$likeBtn.click(function(){
		getActiveCard();
		$results[$($currentActiveCard).data('intelligence')]++;


		similarButtonFunctions();
		setTimeout(function(){
			$currentActiveCard.addClass('like');
			setTimeout(function(){
				$currentActiveCard.remove();
			}, 400);
		},1);
		
	});
	
	// Click Dislike
	$dislikeBtn.click(function(){
		getActiveCard();
		similarButtonFunctions();

		setTimeout(function(){
			$currentActiveCard.addClass('dislike');
			setTimeout(function(){
				$currentActiveCard.remove();
			}, 400);
		},1);
	
		
	});
	
});

function createCards(cards) {
		cards.forEach(function(card) {
			$('.upcoming').append(`
				<div class="card" data-intelligence="${card.IM}">
					<div class="image">
						<p>${card.Question}</p>
					</div>
				</div>
			`);
		});
};