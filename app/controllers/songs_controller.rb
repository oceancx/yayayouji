class SongsController < ApplicationController
  def show
  	@song =Song.find(params[:id])
    @comments = @song.comments
  end
end
