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
        Schema::create('buildings', function (Blueprint $table) {
            $table->id();
            $table->string('address')->nullable(false);
            $table->float('square')->nullable(false)->default(0);
            $table->integer('constr_year')->nullable(false)->default(0);
            $table->integer('levels')->nullable(false)->default(1);
            $table->integer('flats')->nullable(false)->default(0);
            $table->float('latitude')->nullable(false);
            $table->float('longitude')->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('buildings');
    }
};
