(function(window, document, $){
    $('.js-add-project-link').click(function(e){
        e.preventDefault();

        var projectLinkIndex = parseInt($('input[name=_project_link_count]').val(), 10),
            prefix = '_project_link_' + projectLinkIndex,
            html = [
                '<div class="project-link-wrapper" data-index="' + projectLinkIndex + '">',
                    '<hr>',
                    '<label for="' + prefix + '_title">Título</label>',
                    '<input type="text" name="' + prefix + '_title">',
                    '<label for="' + prefix + '_url">URL</label>',
                    '<input type="text" name="' + prefix + '_url">',
                    '<small></small>',
                    '<a href="#" class="js-remove-project-link button">Remover</a>',
                '</div>'
            ].join('');

        $('.project-link-parent-wrapper').append(html);
        $('input[name=_project_link_count]').val(projectLinkIndex + 1);
    });

    $('.js-add-info-box').click(function(e){
        e.preventDefault();

        var infoBoxIndex = parseInt($('input[name=_info_box_count]').val(), 10),
            prefix = '_info_box_' + infoBoxIndex,
            html = [
                '<div class="info-box-wrapper" data-index="' + infoBoxIndex + '">',
                    '<hr>',
                    '<label for="' + prefix + '_title">Título</label>',
                    '<input type="text" name="' + prefix + '_title">',
                    '<label for="' + prefix + '_content">Conteúdo</label>',
                    '<textarea name="' + prefix + '_content"></textarea>',
                    '<small>Formato: "chave ==> conteúdo"</small>',
                    '<a href="#" class="js-remove-info-box button">Remover</a>',
                '</div>'
            ].join('');

        $('.info-box-parent-wrapper').append(html);
        $('input[name=_info_box_count]').val(infoBoxIndex + 1);
    });

    $('body').on('click', '.js-remove-info-box', function(e){
        e.preventDefault();

        var i = 0,
            infoBoxCount = parseInt($('input[name=_info_box_count]').val(), 10),
            index = parseInt($(this).parents('.info-box-wrapper').attr('data-index'), 10);

        for (i = index; i < infoBoxCount; i++) {
            var nextIndex = i + 1,
                $target = $('.info-box-wrapper[data-index=' + nextIndex + ']'),
                prefix = '_info_box_' + nextIndex,
                newPrefix = '_info_box_' + i;

            $target.find('input[name=' + prefix + '_title]').attr('name', newPrefix + '_title');
            $target.find('label[for=' + prefix + '_title]').attr('for', newPrefix + '_title');
            $target.find('label[for=' + prefix + '_content]').attr('for', newPrefix + '_content');
            $target.find('textarea[name=' + prefix + '_content]').attr('name', newPrefix + '_content');
            $target.attr('data-index', i);
        }

        $(this).parents('.info-box-wrapper').remove();

        $('input[name=_info_box_count]').val(infoBoxCount - 1);
    });

    $('.js-add-content-box').click(function(e){
        e.preventDefault();

        var $this = $(this),
            index = parseInt($this.attr('data-count'), 10),
            html = $('#js-content-box-tpl').html();

        html = html.replace(/\{\{id\}\}/gi, '[' + index + ']');
        html = html.replace(/disabled/gi, '');

        $(html).appendTo('.content-box-wrapper');

        index += 1;

        $this.attr('data-count', index);
    });


    $('body').on('click', '.js-add-content-box-item', function(e){
        e.preventDefault();

        var $this = $(this),
            parentIndex = $this.parents('.content-box').attr('data-index'),
            index = parseInt($this.attr('data-count'), 10),
            html = $('#js-content-box-item-tpl').html();

        html = html.replace(/\{\{id\}\}/gi, parentIndex);
        html = html.replace(/disabled/gi, '');

        $(html)
        .appendTo('.content-box[data-index="' + parentIndex + '"] .content-box-subitens')
        .find('.content-editor').tinyMCE.execCommand('mceAddControl', false, '_content_box["' + parentIndex + '"][texto][]');



        index += 1;

        $this.attr('data-count', index);

    });


    // $('body').on('change', 'select', function(e){
    //     var $this = $(this),
    //         $parent = $this.parent(),
    //         value = $this.val();

    //     $parent.find('input').show();

    //     if (value === 'link') {
    //         $parent.find('input[name=_highlight_link]').show();
    //     } else {
    //         $parent.find('input[name=_highlight_link]').hide();
    //     }
    // });

    // Add a movie to the carrousel in front-page
    $('.js-add-home-highlight').click(function(e){
        e.preventDefault();

        var infoBoxIndex = parseInt($('input[name=_home_highlight_count]').val(), 10),
            prefix = '_home_highlight_' + infoBoxIndex,
            html = [
                '<div class="home-highlight-wrapper" data-index="' + infoBoxIndex + '">',
                    '<hr>',
                    '<select class="highlight-type" name="' + prefix + '_highlight_type">',
                        '<option value="movie" selected>Filme</option>',
                        '<option value="movie-video">Filme com vídeo</option>',
                        '<option value="link">Link</option>',
                    '</select><br>',

                    '<label for="_highlight_title"><strong>Título do filme</strong></label><br>',
                    '<input type="text" name="' + prefix + '_highlight_title"<br>',

                    '<label for="_highlight_subtitle"><strong>Subtítulo do filme</strong></label><br>',
                    '<input type="text" name="' + prefix + '_highlight_subtitle"<br>',

                    '<label for="_highlight_image"><strong>Imagem</strong></label>',
                    '<input type="text" name="' + prefix + '_highlight_image"/>',
                    '<a href="#" data-uploader data-input="' + prefix + '_highlight_image">Upload</a><br><br>',

                    '<label for="_highlight_link"><strong>Link / Slug</strong></label><br>',
                    '<input type="text" name="' + prefix + '_highlight_link"<br>',

                    '<a href="#" class="js-remove-home-highlight button">Remover</a>',
                '</div>'
            ].join('');

        $('.home-highlight-parent').append(html);
        $('input[name=_home_highlight_count]').val(infoBoxIndex + 1);
    });

    $('body').on('click', '.js-remove-home-highlight', function(e){
        e.preventDefault();

        var i = 0,
            infoBoxCount = parseInt($('input[name=_home_highlight_count]').val(), 10),
            index = parseInt($(this).parents('.home-highlight-wrapper').attr('data-index'), 10);

        for (i = index; i < infoBoxCount; i++) {
            var nextIndex = i + 1,
                $target = $('.home-highlight-wrapper[data-index=' + nextIndex + ']'),
                prefix = '_home_highlight_' + nextIndex,
                newPrefix = '_home_highlight_' + i;

            $target.find('select[name=' + prefix + '_highlight_type]').attr('name', newPrefix + '_highlight_type');
            $target.find('input[name=' + prefix + '_highlight_title]').attr('name', newPrefix + '_highlight_title');
            $target.find('input[name=' + prefix + '_highlight_subtitle]').attr('name', newPrefix + '_highlight_subtitle');
            $target.find('input[name=' + prefix + '_highlight_image]').attr('name', newPrefix + '_highlight_image');
            $target.find('input[name=' + prefix + '_highlight_link]').attr('name', newPrefix + '_highlight_link');
            $target.attr('data-index', i);
        }

        $(this).parents('.home-highlight-wrapper').remove();

        $('input[name=_home_highlight_count]').val(infoBoxCount - 1);
    });

    $('.js-add-content-box').click(function(e){
        e.preventDefault();

        var infoBoxIndex = parseInt($('input[name=_content_box_count]').val(), 10),
            prefix = '_content_box_' + infoBoxIndex,
            html = [
                '<div class="content-box-wrapper" data-index="' + infoBoxIndex + '">',
                    '<hr>',
                    '<select class="highlight-type" name="' + prefix + '_highlight_type">',
                        '<option value="movie" selected>Filme</option>',
                        '<option value="movie-video">Filme com vídeo</option>',
                        '<option value="link">Link</option>',
                    '</select><br>',

                    '<label for="_highlight_title"><strong>Título do filme</strong></label><br>',
                    '<input type="text" name="' + prefix + '_highlight_title"<br>',

                    '<label for="_highlight_subtitle"><strong>Subtítulo do filme</strong></label><br>',
                    '<input type="text" name="' + prefix + '_highlight_subtitle"<br>',

                    '<label for="_highlight_image"><strong>Imagem</strong></label>',
                    '<input type="text" name="' + prefix + '_highlight_image"/>',
                    '<a href="#" data-uploader data-input="' + prefix + '_highlight_image">Upload</a><br><br>',

                    '<label for="_highlight_link"><strong>Link / Slug</strong></label><br>',
                    '<input type="text" name="' + prefix + '_highlight_link"<br>',

                    '<a href="#" class="js-remove-content-box button">Remover</a>',
                '</div>'
            ].join('');

        $('.content-box-parent').append(html);
        $('input[name=_content_box_count]').val(infoBoxIndex + 1);
    });

    $('body').on('click', '.js-remove-content-box', function(e){
        e.preventDefault();

        var i = 0,
            infoBoxCount = parseInt($('input[name=_content_box_count]').val(), 10),
            index = parseInt($(this).parents('.content-box-wrapper').attr('data-index'), 10);

        for (i = index; i < infoBoxCount; i++) {
            var nextIndex = i + 1,
                $target = $('.content-box-wrapper[data-index=' + nextIndex + ']'),
                prefix = '_content_box_' + nextIndex,
                newPrefix = '_content_box_' + i;

            $target.find('select[name=' + prefix + '_highlight_type]').attr('name', newPrefix + '_highlight_type');
            $target.find('input[name=' + prefix + '_highlight_title]').attr('name', newPrefix + '_highlight_title');
            $target.find('input[name=' + prefix + '_highlight_subtitle]').attr('name', newPrefix + '_highlight_subtitle');
            $target.find('input[name=' + prefix + '_highlight_image]').attr('name', newPrefix + '_highlight_image');
            $target.find('input[name=' + prefix + '_highlight_link]').attr('name', newPrefix + '_highlight_link');
            $target.attr('data-index', i);
        }

        $(this).parents('.content-box-wrapper').remove();

        $('input[name=_content_box_count]').val(infoBoxCount - 1);
    });


    // Add news in the home
    $('.js-add-home-news').click(function(e){
        e.preventDefault();

        var infoBoxIndex = parseInt($('input[name=_home_news_count]').val(), 10),
            prefix = '_home_news_' + infoBoxIndex,
            html = [
                '<div class="home-news-wrapper" data-index="' + infoBoxIndex + '">',
                    '<hr>',
                    '<label for="_news_slug"><strong>Slug da Notícia</strong></label><br>',
                    '<input type="text" name="' + prefix + '_news_slug"><br>',

                    '<a href="#" class="js-remove-home-news button">Remover</a>',
                '</div>'
            ].join('');

        $('.home-news-parent').append(html);
        $('input[name=_home_news_count]').val(infoBoxIndex + 1);
    });

    $('body').on('click', '.js-remove-home-news', function(e){
        e.preventDefault();

        var i = 0,
            infoBoxCount = parseInt($('input[name=_home_news_count]').val(), 10),
            index = parseInt($(this).parents('.home-news-wrapper').attr('data-index'), 10);

        for (i = index; i < infoBoxCount; i++) {
            var nextIndex = i + 1,
                $target = $('.home-news-wrapper[data-index=' + nextIndex + ']'),
                prefix = '_home_news_' + nextIndex,
                newPrefix = '_home_news_' + i;

            $target.find('input[name=' + prefix + '_news_slug]').attr('name', newPrefix + '_news_slug');
            $target.attr('data-index', i);
        }

        $(this).parents('.home-news-wrapper').remove();

        $('input[name=_home_news_count]').val(infoBoxCount - 1);
    });

    $('.js-add-home-social').click(function(e){
        e.preventDefault();

        var infoBoxIndex = parseInt($('input[name=_home_social_count]').val(), 10),
            prefix = '_home_social_' + infoBoxIndex,
            html = [
                '<div class="home-social-wrapper" data-index="' + infoBoxIndex + '">',
                    '<hr>',
                    '<label for="' + prefix +'_social_title"><strong>Título</strong></label><br>',
                    '<input type="text" name="' + prefix +'_social_title"><br>',
                    '<label for="' + prefix +'_social_image"><strong>Imagem</strong></label>',
                    '<input type="text" name="' + prefix +'_social_image" />',
                    '<a href="#" data-uploader data-input="' + prefix +'_social_image">Upload</a><br><br>',
                    '<label for="' + prefix +'_social_link"><strong>Link</strong></label><br>',
                    '<input type="text" name="' + prefix +'_social_link"><br>',

                    '<a href="#" class="js-remove-home-post button">Remover</a>',
                '</div>'
            ].join('');

        $('.home-social-parent').append(html);
        $('input[name=_home_social_count]').val(infoBoxIndex + 1);
    });

    $('body').on('click', '.js-remove-home-social', function(e){
        e.preventDefault();

        var i = 0,
            infoBoxCount = parseInt($('input[name=_home_social_count]').val(), 10),
            index = parseInt($(this).parents('.home-social-wrapper').attr('data-index'), 10);

        for (i = index; i < infoBoxCount; i++) {
            var nextIndex = i + 1,
                $target = $('.home-social-wrapper[data-index=' + nextIndex + ']'),
                prefix = '_home_social_' + nextIndex,
                newPrefix = '_home_social_' + i;

            $target.find('select[name=' + prefix + ']').attr('name', newPrefix);
            $target.attr('data-index', i);
        }

        $(this).parents('.home-social-wrapper').remove();

        $('input[name=_home_social_count]').val(infoBoxCount - 1);
    });



    // Uploading files
    $('body').on('click', 'a[data-uploader]', function(e) {
        var file_frame;
        e.preventDefault();
        var $this = $(this);

            // If the media frame already exists, reopen it.
        if ( file_frame ) {
            file_frame.open();
            return;
        }

        // Create the media frame.
        file_frame = wp.media.frames.file_frame = wp.media({
            title: 'Upload de midia',
            button: {
                text: 'Inserir',
            },
            multiple: false  // Set to true to allow multiple files to be selected
        });

        // When an image is selected, run a callback.
        file_frame.on( 'select', function() {
            // We set multiple to false so only get one image from the uploader
            attachment = file_frame.state().get('selection').first().toJSON();

            // Do something with attachment.id and/or attachment.url here
            $('input[name="' + $this.data('input') + '"]').val(attachment.url);
        });

        // Finally, open the modal
        file_frame.open();
    });

}(window, document, jQuery));
