class LettersController < ApplicationController

 	# def new
  # 		@letter = Letter.new
  # 	end
  	def show
  		@letter =Letter.find(params[:id])
  		if (not @letter.is_read || @letter.is_read== false) &&  current_user.name == "丫丫" 
  			@letter.is_read=true
  			@letter.save
  		end
  	    # @comments = @issue.comments
  	end


  	def new
  		@letter =Letter.new
  	end

  	def create
  		Letter.create(letter_params)
  		redirect_to :letterlist
  	end

  	def destroy
  		i = Letter.find(params[:id])
  		i.destroy
  		redirect_to :letterlist
  	end

  	def update
  		i=Letter.find(params[:id]) 
  		i.update_attributes(letter_params)
  		redirect_to :letterlist
  	end


  	def edit
  		@letter = Letter.find(params[:id])
  	end
  	private 
  	def letter_params
  		params.require(:letter).permit!
  	end
  end