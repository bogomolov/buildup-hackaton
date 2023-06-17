<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('city_objects', function (Blueprint $table) {
            $table->id();
            $table->string("name")->nullable(true);
            $table->string("address")->nullable(true);
            $table->string("type")->nullable(false);
            $table->integer('levels')->nullable(true);
            $table->double('latitude',12,8)->nullable(false);
            $table->double('longitude',12,8)->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('city_objects');
    }
};
