class PageController < ApplicationController
	def travelnote
		@issues = Issue.all.reverse
		@songs = Song.all
	end

	def music
		@issues = Issue.all.reverse
		@songs = Song.all
	end

	def video
		@issues = Issue.all.reverse
		@songs = Song.all
	end

	def book
		@issues = Issue.all.reverse
		@songs = Song.all
	end

	def digest
		@issues = Issue.all.reverse
		@songs = Song.all
	end


	def image
		@issues = Issue.all.reverse
		@songs = Song.all
	end

	def letter
		@letters=Letter.all.reverse
	end
	
end