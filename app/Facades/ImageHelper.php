<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;
use Illuminate\Support\Facades\Storage;

use Illuminate\Support\Str;


use App\Models\Media;
use Closure;
use Illuminate\Support\Facades\Response;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Encoders\AutoEncoder;
use Intervention\Image\ImageManager;
use Intervention\Image\Typography\FontFactory;

class ImageHelper extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'imagehelper';
    }

    const SIZES = [
        'preview' => 300,
        'small' => 500,
        'medium' => 1024,
        'large' => 1400,
        'extralarge' => 1920,
    ];

    public static function checkImage($src, $size = 'medium', $folder = 'media', $watermark = false, $height = null, $quality = 100) // $fit = true,
    {
        $width = self::SIZES[$size];
        $img = 'https://dummyimage.com/400x400/';
        // $path = self::imagePath($src, $folder);
        $imageName = self::imageName($src);

        // if Watermark, create an watermark of Original file
        if ($watermark) {
            $folder = self::watermark($folder, $src);
        }

        $dest = '/images/cache/' . $folder . '/' . $size . '/';

        // if Chache file exist, return Chache path
        if (Storage::exists($dest . $imageName)) {
            return $dest . $imageName;
        }

        // if source is not null and Original file exist make Chache
        if ($src !== null && Storage::exists("images/$folder/$src")) {
            // get Original file
            $file = Storage::get("images/$folder/$src");

            $manager = new ImageManager(new Driver());
            $img = $manager->read($file);
            $img = ImageHelper::orientate($img, "images/$folder/$src");

            // resize based on width (and height if height is given)
            if ($height === NULL) {
                $img->scale(width: $width);
            } else {
                $img->resize($width, $height);
            }

            $img = $img->encode(new AutoEncoder(quality: $quality));

            // save Chache file
            Storage::put($dest . $imageName, $img);

            // return Cache path
            return $dest . $imageName;
        } else {
            return $img;
        }
    }

    protected static function orientate($image, $path)
    {
        if (exif_imagetype($path) == IMAGETYPE_JPEG) {
            $exif = @exif_read_data($path);

            if (!empty($exif['Orientation'])) {
                switch ($exif['Orientation']) {
                    case 2:
                        $image->flip('h');
                        break;

                    case 3:
                        $image->rotate(180);
                        break;

                    case 4:
                        $image->flip('v');
                        break;

                    case 5:
                        $image->flip('v');
                        $image->rotate(-90);
                        break;

                    case 6:
                        $image->rotate(-90);
                        break;

                    case 7:
                        $image->flip('h');
                        $image->rotate(-90);
                        break;

                    case 8:
                        $image->rotate(90);
                        break;
                }
            }
        }

        return $image;
    }

    public static function upload($file, $type = 'upload', $id = 'media')
    {
        if ($file == null) return null;
        $media = new Media();

        if ($type == 'url') {
            $media->title = now()->timestamp;
            $media->src = $file;
            $media->alt = $media->title;
        } elseif ($type == 'upload') {
            $place =  $id;

            // eerste keer opslaan zodat de naam sluggable word?
            $media->title = Str::slug(Str::beforeLast($file->getClientOriginalName(), '.'));
            $media->alt = $media->title;
            $media->src = (string) getFormattedDate(now(), 'Y/m/') . $media->title . '.' . $file->extension();
            $media->location = $place;

            $media->save();
            $file->storeAs("images/$place", $media->src);
        }

        $media->save();

        return $media->src;
    }

    public static function imageHandler($id, $request, $location = null)
    {
        $image = null;
        if ($request[$id . '_file_url'] !== null || $request[$id . '_image_upload'] == !null) {
            $image = $request->has($id . '_image_upload')
                ? self::upload($request[$id . '_image_upload'], 'upload', $location ?? $id)
                : self::upload($request[$id . '_file_url'], 'url', $location ?? $id);
        }

        return $image;
    }

    public static function isUrl($src)
    {
        return Str::contains($src, 'http');
    }

    public static function imagePath($src, $folder)
    {
        return "$folder/" . Str::beforeLast($src, '/') . '/';
    }

    public static function imageName($src)
    {
        return Str::afterLast($src, '/');
    }

    public static function watermark($folder, $src)
    {
        if (!Storage::exists("images/watermark/$folder/$src")) {
            $filePath = Storage::get("images/$folder/$src");

            Storage::put("images/watermark/$folder/$src", $filePath);

            $watermark = Storage::get("images/watermark/$folder/$src");
            $logoPath = Storage::get('images/logoopwegadvies-groen.png');

            $manager = new ImageManager(new Driver());
            $img = $manager->read($watermark);
            $logo = $manager->read($logoPath);

            $logo->scale(width: $img->width() * 0.5);

            $img->place($logo, 'center', 0, 0, 50);

            $img->scale(width: 1280);

            $img->save("images/watermark/$folder/$src");
        }

        return "watermark/$folder";
    }
}
